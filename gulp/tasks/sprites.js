"use strict";

import {paths} from "../../gulpfile.babel";
import gulp from "gulp";
import svg from "gulp-svg-sprite";
import debug from "gulp-debug";
import browsersync from "browser-sync";

const sprites = () => {
    return gulp.src(paths.sprites.src)
        .pipe(svg({
            shape: {
                dest: "intermediate-svg"
            },
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(paths.sprites.build))
        .pipe(debug({
            "title": "Sprites"
        }))
        .on("end", browsersync.reload);
};

export default sprites;