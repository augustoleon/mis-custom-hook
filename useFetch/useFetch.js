import { useEffect, useRef, useState } from "react"


export const useFetch = ( url ) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null });

    useEffect( () => {
        return () => {
            // este cambio no dispara nuevamente la renderización del componente
            isMounted.current = false;
        }
    },[])

    useEffect( () => {

        // Agrego el setState dentro del useEffect para que me aparezca el loading
        setState({data: null, loading: true, error: null});

        fetch( url )
        .then( resp => resp.json() )
        .then( data => {

            if(isMounted.current) {
                
                setState({
                    loading: false,
                    error: null,
                    data
                })
            }
        })
        .catch( () => {
            setState({
                data: null, 
                loading: false,
                error: 'No se pudo cargar la info'
            })
        }) 
        
    },[ url ]);
    
    return state

}
