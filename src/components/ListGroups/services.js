export const clearFields = ({ setNewGroup }) =>
  setNewGroup((newGroup) =>
    newGroup.reduce((acc, item) => {
      acc.push({
        ...item,
        value: "",
      });
      return acc;
    }, [])
  );
export const fillFields = ({ setNewGroup, room }) =>
  setNewGroup((newGroup) =>
    newGroup.reduce((acc, item) => {
      for (const key in room) {
        if (key === item.name) {
          acc.push({
            ...item,
            value: room[key],
          });
        }
      }
      return acc;
    }, [])
  );
