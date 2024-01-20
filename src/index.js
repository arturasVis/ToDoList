import './styles/styles.css'
import './styles/reset.css'
import { CreateProjectButton } from './scripts/ProjectCardLoader';
import { reloadProjects } from './scripts/ProjectCardLoader';


const button=document.querySelector('#button');
CreateProjectButton();
reloadProjects();
