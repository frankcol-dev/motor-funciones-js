# ⚙️ Motor de Funciones en JavaScript

Sistema dinámico que permite registrar y ejecutar funciones de forma flexible, soportando ejecución síncrona y asíncrona.

## 🚀 Características

- Registro dinámico de funciones
- Soporte para funciones síncronas y asíncronas
- Uso de `Promise.resolve` para normalizar resultados
- Manejo de errores
- Simulación de carga

## 📌 Ejemplo

```js
funciones("a", "Hola Mundo")
    .then(console.log)
    .catch(console.error);
```

## 🧠 Código completo

```js
// Validadores
const validarString = string => {
    if (typeof string !== "string" || !string.trim())
        throw new Error('No ingresaste un string');
    return string.trim();
};

const validarNumber = number => {
    if (!Number.isFinite(number) || number < 0)
        throw new Error('dato ingresado no valido');
    return number;
};

// Objeto acumulador
const acciones = {};

// Agregar funciones
const agregarFunciones = (name, info, ejecutar) => {
    const cleanName = validarString(name).toLowerCase();

    if (acciones[cleanName])
        throw new Error(`La función ${cleanName} ya existe.`);

    if (typeof ejecutar !== "function")
        throw new Error(`El ejecutor debe ser una función`);

    acciones[cleanName] = { info, ejecutar };
};

// Motor
const funciones = (option, input, value) => {
    try {
        const menu = `Funciones en JavaScript
${Object.entries(acciones)
    .map(([key, val]) => `${key} :${val.info}`)
    .join("\n")}`;

        if (option == null) return Promise.resolve(menu);

        const cleanOption = validarString(option).toLowerCase();

        if (!acciones[cleanOption])
            throw new Error('Opción no contemplada');

        const accion = acciones[cleanOption];

        return Promise
            .resolve(accion.ejecutar(input, value))
            .then(resultado => `${accion.info}\n${resultado}`);

    } catch (e) {
        return Promise.reject(e);
    }
};

// Ejemplo de uso
agregarFunciones("a", "Longitud", input => {
    validarString(input);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`${input} | ${input.length} caracteres.`);
        }, 1000);
    });
});

funciones("a", "Hola Mundo")
    .then(console.log)
    .catch(console.error);
```

## 🎯 Objetivo

Este proyecto fue desarrollado para practicar la construcción de sistemas dinámicos en JavaScript y comprender el flujo entre código síncrono y asíncrono.

## 🧠 Conceptos aplicados

- Closures
- Promesas
- Asincronía
- Manejo de errores
- Estructuras dinámicas
