import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { db } from "@/../../firebaseConfig";

interface Agent {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const agentsRef = ref(db, "fieldData");

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
