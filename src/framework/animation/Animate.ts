//@ts-ignore
import anime from 'animejs/lib/anime.es.js';

//https://animejs.com/documentation

export default (params: any) => {
    setTimeout(() => {
        if (document.querySelector(params.targets)) {
            anime(params)
        } else {
            document.addEventListener('DOMContentLoaded', (_) => anime(params))
        }
    }, 1)
}
