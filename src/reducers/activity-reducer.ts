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

//Tipo de la actividad, al enviar el formulario con el boton de guardar se ejecutará la Action de tipo "save-activity" con el payload que te paso
export type ActivityActions = {
  type: "save-activity";
  payload: { newActivity: Activity };
};

//Estado (state) que contendrá todas las actividades que vayamos creando.
type ActivityState = {
  activities: Activity[];
};

//Estado inicial del reducer inicia como array vacio
export const initialState: ActivityState = {
  activities: [],
};

//Reducer que conecta el state inicial y la Action
export const activityReducer = (
  state: ActivityState = initialState, //State de tipo ActivityState con valor iniciarl de initialState
  action: ActivityActions //*Las acciones nos ayudan a describir que es lo que esta pasando y que información es la que se va a modificar en que parte de nuestro state */
) => {
  if (action.type === "save-activity") { //Si la accion que le llega al reducer es de tipo save-activity haz esto
    /* console.log("Tipo", action.type)
    console.log("Actividad nueva", action.payload.newActivity) */

    //Aqui puede ir toda la logica para evitar actividades duplicadas, etc...

    return { //Actualizar el state añadiendo la nueva actividad a las que ya hubiera creadas
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  } else {
    throw new Error(`Accion no definida type: ${action.type}`);
  }
};
