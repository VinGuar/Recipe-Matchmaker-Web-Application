import styles from "../comps/Footer.module.css"

const Footer = () => {

    return ( 
            <div className={styles.footerMain}>
                <div className={styles.name}>
                    <p className={styles.foothead}>I hope you enjoyed this Recipe tool presented by Vincent Guarnieri!</p>
                    <a style={{"align-self":"center", "color":"rgb(220,220,220)"}} href="mailto:vincentguarnieri1@gmail.com">
                        <p className={styles.footerpara} style={{"border-bottom":"none"}}>vincentguarnieri1@gmail.com</p>
                    </a>
                </div>
                <div className={styles.iconfootersecs}>              
                    <a href="https://github.com/VinGuar?tab=repositories" target="_blank">
                        <img alt="github logo" className={styles.iconfooter} style ={{"width":"65px"}} src="github.png" />
                    </a>
                    <a href="https://www.linkedin.com/in/vincent-guarnieri-5343a8278/" target="_blank">
                        <img alt="linkedin logo" className={styles.iconfooter} style ={{"width": "53px"}} src="linked.png" />
                    </a>
                </div>
            </div>

     );
     
}


 
export default Footer;