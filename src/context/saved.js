import { createContext } from "react";

const ContextSaved = createContext();

const ContextProviderSaved = ({ children }) => {

    const savedProducts = JSON.parse(
        localStorage.getItem("saved-products")
    )

    if (!savedProducts) {
        localStorage.setItem("saved-products",
            JSON.stringify([]))
    }

    const CheckSaved = (payload) => {

        if (!savedProducts.length) {
            savedProducts.push({ ...payload, saved: true });
        }

        savedProducts.forEach(element => {

            if (element.id !== payload?.id) {
                savedProducts.push({ ...payload, saved: true });
            }
        });

        localStorage.setItem("saved-products",
            JSON.stringify(savedProducts));
    }

    const SavedContent = { CheckSaved, savedProducts }

    return <ContextSaved.Provider value={SavedContent}>
        {children}
    </ContextSaved.Provider>
}

export { ContextProviderSaved, ContextSaved }