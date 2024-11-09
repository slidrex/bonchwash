import React, { useEffect, useRef, useState } from 'react';
function VKIDButton() {
    const vkidContainerRef = useRef(null);
    const [codeChallenge, setCodeChallenge] = useState(null);
    const [codeVerifier, setCodeVerifier] = useState(null);

    useEffect(() => {
        // Запрашиваем данные с сервера
        fetch('https://bonchwash.ru/api/v1/init-auth')
            .then(response => response.json())
            .then(data => {
                setCodeChallenge(data.code_challenge);
                setCodeVerifier(data.code_verifier);

                // Сохраняем code_verifier в sessionStorage, чтобы не зависеть от URL после редиректа
                sessionStorage.setItem('vk_code_verifier', data.code_verifier);
            })
            .catch(error => console.error("Ошибка инициализации авторизации VK:", error));
    }, []);

    useEffect(() => {
        if (codeChallenge && !window.VKIDSDK) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
            script.async = true;

            script.onload = () => {
                if ('VKIDSDK' in window) {
                    const VKID = window.VKIDSDK;

                    VKID.Config.init({
                        app: 52503899,
                        redirectUrl: 'https://bonchwash.ru',
                        codeChallenge: codeChallenge,
                        scope: "profile",
                        mode: VKID.ConfigAuthMode.InNewTab,
                    });

                    const oneTap = new VKID.OneTap();

                    oneTap.render({
                        container: vkidContainerRef.current,
                        fastAuthEnabled: false,
                        showAlternativeLogin: true,
                        styles: {
                            borderRadius: 20,
                            width: 370,
                            height: 40,
                        },
                    })
                        .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
                            const { code } = payload;

                            // Получаем code_verifier из sessionStorage
                            const codeVerifier = sessionStorage.getItem('vk_code_verifier');

                            // Отправка запроса для обмена кода на токены
                            fetch("https://bonchwash.ru/api/v1/exchange-code", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    code: code,
                                    redirect_uri: 'https://bonchwash.ru',
                                    client_id: 52503899,
                                    device_id: payload.device_id,
                                    state: codeVerifier  // Передаем сохранённый `code_verifier`
                                }),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log("Токены:", data);
                                })
                                .catch(error => console.error("Ошибка обмена кода:", error));
                        })
                        .on(VKID.WidgetEvents.ERROR, error => {
                            console.error("Ошибка авторизации VK:", error);
                        });
                }
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [codeChallenge]);

    return <div ref={vkidContainerRef} />;
}


export default VKIDButton;
