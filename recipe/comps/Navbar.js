import styles from "../comps/Navbar.module.css"




const Navbar = () => {

    return ( 
            <nav>
                <main className={styles.navMain}>
                    <div className={styles.sticky}>
                        <h1 className={styles.navHead}>Welcome to the Recipe Matchmaker!</h1>
                        <h1 className={styles.vincentText}>By: Vincent Guarnieri</h1>
                    </div>
                </main>
            </nav>

     );
     
}


 
export default Navbar;