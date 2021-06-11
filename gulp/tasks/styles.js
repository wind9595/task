"use strict";

import {paths} from "../../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import sass from "gulp-sass";
import minCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";

const argv = yargs.argv,
    production = argv.production;


const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(plumber())
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        //.pipe(groupmedia())
        .pipe(gulpif(production, autoprefixer({
            cascade: false,
        })))
        .pipe(gulpif(production, minCSS({
            compatibility: "ie8", //режим совместимости ie8+
            level: { //уровни опитимизации
                1: {
                    specialComments: 'all',
                    removeEmpty: true, //удаление пустых правил
                    removeWhitespace: true //удаление неиспользуемых пробелов
                },
                2: {
                    mergeMedia: true, // слияние @media
                    removeEmpty: true, //удаление пустых правил
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false
                }
            }
        })))
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(plumber.stop())
        .pipe(gulpif(!production, sourcemaps.write("./maps/")))
        .pipe(gulp.dest(paths.styles.build))
        .pipe(debug({
            "title": "CSS files"
        }))
        .on("end", browsersync.reload);
};

export default styles;