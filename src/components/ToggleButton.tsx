import { useExtensionStore } from "../store/useExtensionStore.ts";

interface ToggleButtonProps {
    id: string;
    isActive: boolean;
}

const ToggleButton = ({ id, isActive }: ToggleButtonProps) => {
    const toggleExtension  = useExtensionStore((state)=>state.toggleExtension);

    const handleToggle = () => {
        toggleExtension(id, isActive);
    };

    return (
        <div
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition
        ${isActive ? "bg-red-600" : "toggle-btn-bg"}`}
            onClick={handleToggle}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md border transform transition
          ${isActive ? "translate-x-6 border-red-600" : "translate-x-0 border-gray-500"}`}
            />
        </div>
    );
};

export default ToggleButton;
