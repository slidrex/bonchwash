import React, { useEffect, useRef } from 'react';

function VKIDButton() {
    const vkidContainerRef = useRef(null);

    useEffect(() => {
        // Проверяем, был ли уже добавлен скрипт VKID SDK
        if (!window.VKIDSDK) {
            console.log("run")
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
            script.async = true;

            script.onload = () => {
                if ('VKIDSDK' in window) {
                    const VKID = window.VKIDSDK;

                    VKID.Config.init({
                        app: 52503899,
                        redirectUrl: 'https://bonchwash.ru',
                        responseMode: VKID.ConfigResponseMode.Callback,
                        source: VKID.ConfigSource.LOWCODE,
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
                        .on(VKID.WidgetEvents.ERROR, vkidOnError)
                        .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
                            const { code, device_id: deviceId } = payload;

                            VKID.Auth.exchangeCode(code, deviceId)
                                .then(vkidOnSuccess)
                                .catch(vkidOnError);
                        });
                }
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    function vkidOnSuccess(data) {
        console.log('Авторизация успешна:', data);
        fetch('http://bonchwash.ru/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                vk_user_id: data.user_id,
            }),
            credentials: 'include'  // cookie enable
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка при авторизации на сервере');
            return response.json();
        })
        .then(response => console.log('Ответ сервера:', response))
        .catch(error => console.error('Ошибка отправки данных на сервер:', error));
    }

    function vkidOnError(error) {
        console.error('Ошибка авторизации:', error);
    }

    return <div ref={vkidContainerRef} />;
}

export default VKIDButton;
