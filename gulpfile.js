var gulp = require("gulp"),
    less = require("gulp-less"),
    browserSync = require("browser-sync"),
    path = {
        HTML : "*.html",
        LESS : "less/*.less",
        CSS : "static/css",
        JS : "static/js/*.js"
    };

gulp.task("serve", ["less", "js-watch", "html"], function() {
    browserSync.init({
        server : "./"
    });

    gulp.watch(path.LESS, ["less"]);
    gulp.watch(path.JS, ["js-watch"]);
    gulp.watch(path.HTML, ["html"]);
    gulp.watch(path.HTML).on("change", function() {
        browserSync.reload;
    });
});


gulp.task("less", function() {
    gulp.src(path.LESS)
        .pipe(less())
        .pipe(gulp.dest(path.CSS))
        .pipe(browserSync.stream());
})


gulp.task("js-watch", function() {
    gulp.src(path.JS)
    .pipe(browserSync.stream());
})

gulp.task("html", function() {
    gulp.src(path.HTML)
    .pipe(browserSync.stream());
})

gulp.task("default", ["serve"])

//如果想添加对CSS的监听,想上面监听less html js 一样
//我既然用了less就不用监听css了
