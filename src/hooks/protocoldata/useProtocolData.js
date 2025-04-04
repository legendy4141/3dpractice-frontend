import { useState, useEffect } from "react";
import axios from "axios";

export const useProtocolData = (token) => {
  const [areas, setAreas] = useState([]);
  const [conditions, setConditions] = useState({});

  useEffect(() => {
    const fetchProtocolArea = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/condition`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newRealConditions = response.data.reduce((acc, item) => {
          if (!acc.some((existingItem) => existingItem.area === item.area)) {
            acc.push({ area: item.area });
          }
          return acc;
        }, []);

        newRealConditions.sort((a, b) => a.area.localeCompare(b.area));
        setAreas(newRealConditions);

        const newConditions = response.data.reduce(
          (acc, { area, acondition }) => {
            if (acc[area]) {
              acc[area].push(acondition);
            } else {
              acc[area] = [acondition];
            }
            return acc;
          },
          {}
        );
        for (let area in newConditions) {
          newConditions[area].sort(); // This sorts the array in ascending order by default
        }
        setConditions(newConditions);
      } catch (err) {
        console.error("Error fetching protocol area:", err);
      }
    };

    fetchProtocolArea();
  }, [token]);

  return { areas, conditions };
};
