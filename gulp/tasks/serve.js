"use strict";

import {paths} from "../../gulpfile.babel";
import gulp from "gulp";
import views from "./views";
import styles from "./styles";
import scripts from "./scripts";
import images from "./images";
import fonts from "./fonts";
import browsersync from "browser-sync";
import sprites from "./sprites";

const serve = () => {
    browsersync.init({
        server: "./build/",
        port: 4000,
        notify: true
    });

    gulp.watch(paths.views.watch, gulp.parallel(views));
    gulp.watch(paths.styles.watch, gulp.parallel(styles));
    gulp.watch(paths.scripts.watch, gulp.parallel(scripts));
    gulp.watch(paths.images.watch, gulp.parallel(images));
    gulp.watch(paths.sprites.watch, gulp.parallel(sprites));
    gulp.watch(paths.fonts.watch, gulp.parallel(fonts));
};

export default serve;