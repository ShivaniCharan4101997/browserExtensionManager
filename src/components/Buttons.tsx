import {useExtensionStore} from "../store/useExtensionStore.ts";


function Buttons() {
    // const currentFilter = useExtensionStore((state) => state.filter)
    const theme = useExtensionStore((state) => state.theme);
    const setFilter = useExtensionStore((state) => state.setFilter);
    return (
        <div className="flex items-center flex-wrap gap-4 justify-center lg:justify-between mt-6 lg:mt-10 mb-4">
            <h1 className="text-[var(--heading-color)] font-bold text-3xl capitalize">
                Extensions List
            </h1>
            <div className="buttons-list space-x-2">
                <button className={`btn ${theme === "dark" ? "btn-dark" : "btn-light"}`

                } onClick={()=>setFilter("all")}>All</button>
                <button onClick={()=>setFilter("active")} className={`btn ${theme === "dark" ? "btn-dark" : "btn-light"}`}>Active</button>
                <button
                    onClick={()=>setFilter("inactive")}
                    className={`btn ${theme === "dark" ? "btn-dark" : "btn-light"}`}>Inactive</button>

            </div>
        </div>
    );
}

export default Buttons;
