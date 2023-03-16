import './sass/main.scss'
import { dayCircleCtx, selectListener } from './dayCircle';

const main = document.createElement('main')
document.body.append(main)

main.append(dayCircleCtx)
selectListener()


console.log('done')