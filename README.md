# AtomTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.


## Descripción del proyecto

Este proyecto es una aplicación de gestión de tareas que permite a los usuarios crear, editar, eliminar y visualizar tareas de forma sencilla. La aplicación utiliza Firebase para la autenticación y el almacenamiento de datos, y está construida utilizando Angular como framework de desarrollo.

## Tecnologías y herramientas utilizadas

Angular:
Framework de desarrollo web utilizado para construir la interfaz de usuario. Se usaron componentes standalone y reactive forms para manejar el estado de la aplicación y la interacción del usuario.

Firebase:
- Firestore: Base de datos que permite la consulta y manipulación eficiente de los datos.
- Firebase Authentication: Proporciona servicios de autenticación para gestionar el inicio de sesión de los usuarios de forma segura utilizando como proveedor solamente el correo electrónico.

Angular Material:
Biblioteca de componentes de UI que se utiliza para crear interfaces de usuario modernas y responsivas. Se utilizó para los formularios y otros elementos visuales.

Bootstrap 5:
Framework de CSS que se usó para estilizar la aplicación y asegurar que la interfaz sea responsiva y visualmente atractiva. Se usaron clases de Bootstrap para crear un diseño consistente y fácil de usar.

TypeScript:
Lenguaje de programación utilizado en lugar de JavaScript para proporcionar tipado estático y mejorar la calidad del código.

RxJS:
Librería utilizada para manejar programación reactiva y facilitar la gestión de eventos asíncronos y flujos de datos.

SweetAlert:
Biblioteca utilizada para mostrar alertas amigables y personalizadas a los usuarios, mejorando la experiencia de usuario en la aplicación.

Angular CLI:
Herramienta de línea de comandos que se utilizó para crear y gestionar el proyecto Angular, así como para ejecutar comandos de construcción y despliegue.

Control de Versiones (Git):
Sistema de control de versiones utilizado para gestionar el código fuente del proyecto y facilitar la colaboración y seguimiento de cambios.

## Diseño

Estructura de Componentes: Se utilizó una estructura modular para separar la lógica de la aplicación en componentes reutilizables, facilitando el mantenimiento y la escalabilidad.
Gestión de Estado: Se implementó un enfoque basado en servicios para gestionar el estado de las tareas y la autenticación, permitiendo que los componentes se mantengan simples y enfocados en la presentación.
Interfaz de Usuario: Se priorizó la experiencia del usuario utilizando componentes de Angular Material y Bootstrap, asegurando que la aplicación sea responsiva y fácil de usar en diferentes dispositivos.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.