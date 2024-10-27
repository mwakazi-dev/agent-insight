import { useEffect, useState } from "react";
import { db } from "@/../../firebaseConfig"; // Adjust the import path as necessary
import { ref, onValue } from "firebase/database";

interface Agent {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  // Add any other agent properties you may need
}

const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const agentsRef = ref(db, "fieldData"); // Reference to the agents node

    const unsubscribe = onValue(
      agentsRef,
      (snapshot) => {
        setLoading(true);
        const agentData = snapshot.val();

        if (agentData) {
          const agentsArray = Object.keys(agentData).map((key) => ({
            id: key,
            ...agentData[key],
          }));
          setAgents(agentsArray);
        } else {
          setAgents([]);
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  return { agents, loading, error };
};

export default useAgents;
