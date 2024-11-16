import React from 'react';

function VKIDButton() {


        if (!window.VKIDSDK) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
            script.async = true;

            script.onload = () => {
                if ('VKIDSDK' in window) {
                    const VKID = window.VKIDSDK;

                    VKID.Config.init({
                        app: 52503899,
                        redirectUrl: 'https://bonchwash.ru',
                        state: '3jkhri0fvh38v34b9p33hvjhn'
                    });

                    const oneTap = new VKID.OneTap();

                    oneTap.render({
                        container: document.getElementById('VkIdSdkOneTap'),
                        fastAuthEnabled: false,
                        showAlternativeLogin: true,
                        styles: {
                            borderRadius: 20,
                            width: 370,
                            height: 40,
                        },
                    })
                        .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {


                            // Отправка запроса для обмена кода на токены
                            fetch("https://bonchwash.ru/api/v1/exchange-code", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    silent_token: payload,
                                    redirect_uri: 'https://bonchwash.ru',
                                    client_id: 52503899,
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

    return <div  />;
}

export default VKIDButton;
