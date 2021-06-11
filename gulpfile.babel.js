"use strict";

import gulp from "gulp";
import styles from "./gulp/tasks/styles";
import clean from "./gulp/tasks/clean";
import serve from "./gulp/tasks/serve";
import fonts from "./gulp/tasks/fonts";
import views from "./gulp/tasks/views";
import images from "./gulp/tasks/images";
import toWebp from "./gulp/tasks/webp";
import sprites from "./gulp/tasks/sprites";
import scripts from "./gulp/tasks/scripts";

const paths = {
    views: {
        src: [
            "./src/views/*.html"
        ],
        srcComponents: [
            "./src/views/components/**/*.html",
        ],
        build: "./build/",
        watch: [
            "./src/views/**/*.html"
        ]
    },
    styles: {
        src: "./src/styles/main.{scss,sass}",
        build: "./build/styles/",
        watch: [
            "./src/styles/**/*.{scss,sass}"
        ]
    },
    scripts: {
        src: "./src/js/index.js",
        build: "./build/js/",
        watch: [
            "./src/js/**/*.js"
        ]
    },
    images: {
        src: [
            "./src/img/*.{jpg,jpeg,png,svg}",
        ],
        build: "./build/img/",
        watch: "./src/img/*.{jpg,jpeg,png,svg}"
    },
    sprites: {
        src: "./src/img/svg/*.svg",
        build: "./build/img/sprites/",
        watch: "./src/img/svg/*.svg"
    },
    fonts: {
        src: "./src/fonts/**/*.{eot,otf,ttf,woff,woff2}",
        build: "./build/fonts/",
        watch: "./src/fonts/**/*.{eot,otf,ttf,woff,woff2}"
    },
};

export {paths};

export const dev = gulp.series(
    clean,
    gulp.parallel(
        views,
        styles,
        scripts,
        images,
        sprites,
        fonts
    ),
    gulp.parallel(serve)
);

export const prod = gulp.series(
    clean,
    gulp.parallel(
        views,
        styles,
        scripts,
        images,
        toWebp,
        sprites,
        fonts
    )
);

export {clean, fonts, views, styles, scripts, images, toWebp, sprites};