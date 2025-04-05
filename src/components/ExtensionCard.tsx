import ToggleButton from "./ToggleButton.tsx";
import {useExtensionStore} from "../store/useExtensionStore.ts";
import {ExtensionProps} from "../types.ts";
import * as React from "react";

interface ExtensionCardProps {
    extension: ExtensionProps;
}

function ExtensionCard({extension}:ExtensionCardProps) {
    const theme = useExtensionStore((state) => state.theme);
    const handleRemoveExtension = useExtensionStore((state) => state.handleRemoveExtension);

    return (
        <div
            key={extension.id}
            className="bg-[--navbar-bg] border border-[#545969] p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition duration-300 mt-4"
        >
            <div className="flex items-start space-x-4 mb-4">
                <img src={extension.logo} alt={extension.name} className="w-16 h-16 mb-4" />
                <div className="flex flex-col items-start space-y-2">
                    <h2 className="text-xl font-bold card-heading">{extension.name}</h2>
                    <p className="text-start card-para font-medium text-base mb-4">{extension.description}</p>
                </div>
            </div>

            <div className="flex justify-between w-full items-center">
                <button
                    onClick={()=>handleRemoveExtension(extension.id)}
                    className={`btn ${theme === "dark" ? "btn-dark" : "btn-light"}`}
                >
                    Remove
                </button>
                <ToggleButton  isActive={extension.isActive} id={extension.id} />
            </div>
        </div>
    );
}

export default React.memo(ExtensionCard);
