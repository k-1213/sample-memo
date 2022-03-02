const mix = require('laravel-mix');

mix.js('resources/ts/app.tsx', 'public/js')
    .react()
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        },
   })
   .version();
