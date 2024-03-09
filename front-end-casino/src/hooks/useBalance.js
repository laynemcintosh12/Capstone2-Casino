import { useEffect, useState } from "react";
import CasinoAPI from "../api";
import { jwtDecode } from "jwt-decode";

const useBalance = () => {
    const [balance, setBalance] = useState(null);

    const fetchBalance = async () => {
        try {
            const username = localStorage.getItem("token");
            const decoded = jwtDecode(username);
            const res = await CasinoAPI.fetchBalance(decoded.username);
            setBalance(res);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    // Function to manually trigger balance update
    const updateBalance = () => {
        fetchBalance();
    };

    return { balance, updateBalance };
};

export default useBalance;

