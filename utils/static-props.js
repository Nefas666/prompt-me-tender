import {getGlobalData} from './global-data';

export function getStaticProps() {
    const globalData = getGlobalData();
    console.log(globalData);
  
    return { props: { globalData } };
}