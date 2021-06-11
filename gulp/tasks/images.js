"use strict";

import {paths} from "../../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = argv.production;

const images = () => {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.build))
        .pipe(gulpif(production, imagemin([
            imageminPngquant({
                speed: 5,
                quality: [0.6, 0.8]
            }),
            imageminZopfli({
                more: true
            }),
            imageminMozjpeg({
                progressive: true,
                quality: 70
            }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { removeUnusedNS: false },
                    { removeUselessStrokeAndFill: false },
                    { cleanupIDs: false },
                    { removeComments: true },
                    { removeEmptyAttrs: true },
                    { removeEmptyText: true },
                    { collapseGroups: true }
                ]
            })
        ])))
        .pipe(gulp.dest(paths.images.build))
        .pipe(debug({
            "title": "Images"
        }))
        .pipe(browsersync.stream());
};

export default images;