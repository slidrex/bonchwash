import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

function VKIDButton() {
    const vkidContainerRef = useRef(null);
    const navigate = useNavigate();

    const vkidOnSuccess = useCallback((data) => {
        console.log('Авторизация успешна:', data);
        fetch('https://bonchwash.ru/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                vk_user_id: data.user_id,
            })
        })
            .then(response => {
                if (!response.ok) throw new Error('Authentication failed');
                return response.json();
            })
            .then(data => {
                console.log('Authentication successful:', data);
                navigate("/booking");
            })
            .catch(error => console.error('Auth Error:', error));
    }, [navigate]);

    function vkidOnError(error) {
        console.error('Ошибка авторизации:', error);
    }

    useEffect(() => {
        if (!window.VKIDSDK) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
            script.async = true;

            const code_verifier = 'Ozl_e9WZx-zKRaJIDGiwQ6Jh-OYHxJ_CuAS4OHyR9Xw';

            async function initializeVKID() {
                const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(code_verifier));
                const code_challenge = btoa(String.fromCharCode(...new Uint8Array(buffer)))
                    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

                script.onload = () => {
                    if ('VKIDSDK' in window) {
                        const VKID = window.VKIDSDK;

                        VKID.Config.init({
                            app: 52503899,
                            redirectUrl: 'https://bonchwash.ru',
                            codeChallenge: code_challenge,
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

                                fetch("https://bonchwash.ru/api/v1/exchange-code", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        code: code,
                                        code_challenge: code_challenge,
                                        device_id: deviceId,
                                    }),
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error("Failed to exchange code");
                                        }
                                        return response.json();
                                    })
                                    .then(data => vkidOnSuccess(data))
                                    .catch(error => vkidOnError(error));
                            });
                    }
                };

                document.body.appendChild(script);
            }

            initializeVKID();

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [vkidOnSuccess]);

    return <div ref={vkidContainerRef} />;
}

export default VKIDButton;
