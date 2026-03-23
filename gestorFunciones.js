//Validadodres
const validarString = string => {
    if (typeof string !== "string" || !string.trim())
        throw new Error('No ingresaste un string')
    return string.trim();
};
const validarNumber = number => {
    if (!Number.isFinite(number)||number < 0)
        throw new Error('dato ingresado no valido')
    return number
};
//ObjetoAcumulador
const acciones = {};

//AgregarFunciones
const agregarFunciones = (name,info,ejecutar) => {

    const cleanName = validarString(name).toLowerCase();
    if (acciones[cleanName])
        throw new Error(`La función ${cleanName} ya existe.`)
    if (typeof ejecutar !== "function")
        throw new Error(`El ejecutor debe ser una función`);
    acciones[cleanName] = {info,ejecutar};
};
//Motor
// 🔹 Motor con indicador de carga animado
const funciones = (option, input, value) => {
    try {
        const menu = `Funciones en JavaScript
${Object.entries(acciones)
        .map(([key,val])=> `${key} :${val.info}`)
        .join("\n")}`;

        if (option == null) {
            console.info("Cargando opciones..");
            // simulamos delay mientras "carga" las opciones
            return new Promise(resolve => {
                let dots = ".";
                const interval = setInterval(() => {
                    dots += "..";
                    console.info("Cargando opciones" + dots);
                }, 200); // cada 200ms agrega un punto

                setTimeout(() => {
                    clearInterval(interval);
                    resolve(menu); // devuelve menú final
                }, 1000); // delay total 1s
            });
        }
        const cleanOption = validarString(option).toLowerCase();
        if (!acciones[cleanOption]) throw new Error('Opción no contemplada');

        const accion = acciones[cleanOption];
        // ejecutamos la función y añadimos delay para animación
        return Promise.resolve(accion.ejecutar(input, value))
                      .then(resultado => {
                          return new Promise(resolve => {
                              setTimeout(() => {
                                  resolve(`${accion.info}\n${resultado}`);
                              }, 1000);
                          });
                      });
    } catch (e) {
        return Promise.reject(e);
    }
};
//AñadirFunciones
agregarFunciones("a","Longitud", input => {
    validarString(input);
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.info("LONGITUD EN JAVASCRIPT")
            resolve(`${input} | ${input.length} caracteres.`)
        }, 1000);
    })
});
funciones("a","Frankcol")
.then(console.info)
.catch(console.error)
