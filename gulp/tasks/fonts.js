"use strict";

import {paths} from "../../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

const fonts = () => {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.build))
        .pipe(debug({
            "title": "Fonts"
        }));
};

export default fonts;