import React from "react";
import "./header_b.css";

function Header({ showHeaderContainer }) {
    const isRegistered = checkUserLoginStatus();

    return (
        <div className={`header_container ${showHeaderContainer ? 'visible' : 'hidden'}`}>
            <div className="header-content">
                {isRegistered ? (
                    <div className="header_vkname">
                        {/* Content for registered users */}
                    </div>
                ) : (
                    <div>
                        <div className="header_noauth">
                            TEXT
                        </div>
                    </div>
                )}
            </div>
            <div className="header_authorization_button">
                {/* (Placeholder) */}
            </div>
        </div>
    );
}

// Placeholder
function checkUserLoginStatus() {
    return false;
}

export default Header;