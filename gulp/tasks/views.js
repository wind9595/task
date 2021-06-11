"use strict";

import {paths} from "../../gulpfile.babel";
import gulp from "gulp";
import merge from "merge-stream";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = argv.production;

const views = () => {
    return merge(
        gulp.src(paths.views.srcComponents, {base: './src/'})
        .pipe(gulp.dest(paths.views.build)),
        gulp.src(paths.views.src)
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(gulp.dest(paths.views.build))
        .pipe(browsersync.stream()));
};

export default views;