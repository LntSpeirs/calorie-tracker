import { Activity } from "../types";

/**
 * useReducer
 * 
 * Es una alternativa al useState.
 * 
 * El hook useReducer es una herramienta de React que permite manejar el estado de una aplicación de forma eficiente, 
 * especialmente cuando se necesita gestionar estados complejos o múltiples acciones relacionadas.
 * 
 * El hook useReducer es una función de React que te permite gestionar el estado de un componente de manera más estructurada, 
 * especialmente en situaciones donde el estado es complejo o depende de múltiples acciones.
 *
 * Aquí tienes un desglose de cómo funciona:
 *
 * Propósito: useReducer es útil para manejar estados complejos o cuando necesitas lógica que involucra múltiples sub-valores o 
 * cuando el siguiente estado depende del anterior.
 *
 * Sintaxis básica:
 const [state, dispatch] = useReducer(reducer, initialState);

      state: El estado actual.
      dispatch: Una función dispatch para actualizar el estado. Una función que envía acciones al reductor.
      reducer: Una función que toma el estado actual y una acción junto con un payload, y devuelve un nuevo estado.
      initialState: El estado inicial del reducer.
      Actions: las acciones son las funciones que manejan toda la lógica para modificar tu state
      Payload: es la información que modifica tu state
      Dispatch: es la funcion que manda llamar la acción con el payload

Reducer: La función reductor tiene la siguiente forma:

const reducer = (state, action) => {
    switch (action.type) {
        case 'ACCION_1':
            return { ...state, propiedad: valor };
        case 'ACCION_2':
            return { ...state, otraPropiedad: nuevoValor };
        default:
            return state;
    }
};

Uso: Para actualizar el estado, se utiliza la función dispatch con un objeto que representa la acción:

dispatch({ type: 'ACCION_1', payload: valor });


Ventajas:

- Mejora la legibilidad y la organización del código.
- Facilita la gestión de estados complejos en comparación con useState.
- Permite mantener la lógica de actualización del estado separada en la función reductor.
- Manejo de estados complejos: Ideal para gestionar múltiples acciones relacionadas 1.
- Reutilización: Los reducers pueden ser reutilizados en diferentes componentes 5.
- Separación de preocupaciones: Separa la lógica de estado de la UI 1.
- Mejor rendimiento: Puede ser más eficiente que useState para estados complejos 2

Cuándo usar useReducer
  Use useReducer cuando:

  - Necesitas manejar múltiples acciones relacionadas 1.
  - Tu estado es complejo y requiere varios cambios simultáneos 1.
  - Quieres separar la lógica de estado de la UI 5.
  - Necesitas reutilizar el mismo reducer en diferentes componentes 5.
Mejores prácticas
  - Mantén la función reductor pura y sin efectos secundarios 2.
  - Usa tipos de acción para mejorar la legibilidad y mantenimiento del código 1.
  - Considera usar TypeScript para definir los tipos de acciones y estados 

 */

//Tipo de la actividad
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app" };

//Estado (state) que contendrá todas las actividades que vayamos creando.
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

//Revisar si tenemos actividades guardadas en localstorage para usarlas de estado inicial por si refrescan la pagina
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

//Estado inicial del reducer inicia como array vacio
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

//Reducer que conecta el state inicial y la Action
export const activityReducer = (
  state: ActivityState = initialState, //State de tipo ActivityState con valor iniciarl de initialState
  action: ActivityActions //*Las acciones nos ayudan a describir que es lo que esta pasando y que información es la que se va a modificar en que parte de nuestro state */
) => {
  if (action.type === "save-activity") {
    //Si la accion que le llega al reducer es de tipo save-activity haz esto
    let updatedActivities: Activity[] = [];

    if (state.activeId) {
      //Si hay un activeId significa que estoy editando
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      //Si no hay activeId guardo una nueva
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      //Actualizar el state añadiendo la nueva actividad a las que ya hubiera creadas
      ...state,
      activities: updatedActivities,
      activeId: "", //Reseteamos activeId para que cada vez que haya un guardado o editado se vacie id activo
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
