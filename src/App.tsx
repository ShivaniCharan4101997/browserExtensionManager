import Navbar from "./components/Navbar.tsx";
import ExtensionList from "./components/ExtensionList.tsx";
import Buttons from "./components/Buttons.tsx";
import {useExtensionStore} from "./store/useExtensionStore.ts";
import {useEffect} from "react";
import {ExtensionProps} from "./types.ts";

function App() {
const {setExtensions,theme} = useExtensionStore()

    useEffect(() => {
        fetch("http://localhost:3001/extensions")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch extensions");
                }
                return res.json();
            })
            .then((data: ExtensionProps[]) => setExtensions(data))
            .catch((error) => {
                console.error("Error loading extensions:", error);
            });
    }, []);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <main className={"min-h-screen bg-body" } >
            <div className=" w-[90%] lg:w-[80%] mx-auto py-8 lg:py-12 ">
            <Navbar  />
                <Buttons
                />
                <ExtensionList
                />
            </div>
        </main>
    );
}

export default App;