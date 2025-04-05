import ExtensionCard from "./ExtensionCard.tsx";
import { useExtensionStore } from "../store/useExtensionStore.ts";
import { ExtensionProps } from "../types.ts";

function ExtensionList() {
    const getFilteredExtensions = useExtensionStore((state) => state.getFilteredExtensions);
    const filteredExtensions = getFilteredExtensions(); // safe call outside selector


    return (
        <>
            {filteredExtensions.length === 0 && <p className="text-center text-3xl text-white">No extensions found...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExtensions.map((extension: ExtensionProps) => (
                    <ExtensionCard
                        key={extension.id}
                        extension={extension}
                    />
                ))}
            </div>
        </>
    );
}

export default ExtensionList;
