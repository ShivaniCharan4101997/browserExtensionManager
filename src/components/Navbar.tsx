import logoDark from "/assets/images/logoDark.svg"
import logoLight from "/assets/images/logoLight.svg"
import sunIcon from "/assets/images/icon-sun.svg";
import moonIcon from "/assets/images/icon-moon.svg";
import {useExtensionStore} from "../store/useExtensionStore.ts";



function Navbar() {
    const theme = useExtensionStore((state) => state.theme);
    const toggleTheme = useExtensionStore((state) => state.toggleTheme)
    return (
        <div className="rounded-lg lg:rounded-3xl navbar-bg p-4 flex items-center shadow-md justify-between navbar-text">
            <img src={theme === "dark" ? logoDark : logoLight} alt="logo" className="h-10 lg:h-12 w-auto" />
            <button
                onClick={toggleTheme}
                className="navbar-button-bg rounded-xl h-12 w-12 flex items-center justify-center cursor-pointer "
            >
                <img
                    src={theme === "dark" ? sunIcon : moonIcon}
                    alt="theme-icon"
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                />

            </button>
        </div>
    );
}

export default Navbar;
