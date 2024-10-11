import { useMemo, Dispatch } from "react";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
/**
 * Especificar el tipo de lo que le voy a pasar por props, en este caso el array de actividades para renderizarlo
 */
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  /*Como activities pueden cambiar continuamente podemos usar useMemo en lugar del length directamente para aprovechar el cacheo de React para optimizar el rendimiento,
  ya que el length se ejecuta en cada renderizado, lo que puede ser ligeramente menos eficiente si activities cambia frecuentemente.
  */
  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y actividades
      </h2>

      {
        /* activities.length === 0  */
        isEmptyActivities && (
          <p className="text-center mt-5">No hay actividades aún</p>
        )
      }

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calories} {""} <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button>
              <PencilSquareIcon
                className="h-8 w-8 text-gray-800"
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
              />
            </button>

            <button>
              <XCircleIcon
                className="h-8 w-8 text-red-500 hover:text-red-700"
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
              />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
