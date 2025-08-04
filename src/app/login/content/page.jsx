'use client';
import Image from 'next/image';
import { useRef } from 'react';
import styles from './page.module.css';
import { FaUser, FaLock, FaEnvelope, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';

export default function LoginPage() {
    const containerRef = useRef(null);

    const handleSignUp = () => {
        containerRef.current.classList.add(styles['sign-up-mode']);
    };

    const handleSignIn = () => {
        containerRef.current.classList.remove(styles['sign-up-mode']);
    };

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles['forms-container']}>
                <div className={styles['signin-signup']}>
                    <form className={`${styles['sign-in-form']} ${styles.formElement}`}>
                        <h2 className={styles.title}>تسجيل الدخول</h2>
                        <div className={styles['input-field']}>
                            <FaUser />
                            <input type="text" placeholder="اسم المستخدم" />
                        </div>
                        <div className={styles['input-field']}>
                            <FaLock />
                            <input type="password" placeholder="كلمة المرور" />
                        </div>
                        <input type="submit" value="دخول" className={`${styles.btn} ${styles.solid}`} />
                        <p className={styles['social-text']}>أو سجل الدخول عبر الشبكات الاجتماعية</p>
                        <div className={styles['social-media']}>
                            <a href="#" className={styles['social-icon']}><FaFacebookF /></a>
                            <a href="#" className={styles['social-icon']}><FaTwitter /></a>
                            <a href="#" className={styles['social-icon']}><FaGoogle /></a>
                            <a href="#" className={styles['social-icon']}><FaLinkedinIn /></a>
                        </div>
                    </form>
                    <form className={`${styles['sign-up-form']} ${styles.formElement}`}>
                        <h2 className={styles.title}>إنشاء حساب</h2>
                        <div className={styles['input-field']}>
                            <FaUser />
                            <input type="text" placeholder="اسم المستخدم" />
                        </div>
                        <div className={styles['input-field']}>
                            <FaEnvelope />
                            <input type="email" placeholder="البريد الإلكتروني" />
                        </div>
                        <div className={styles['input-field']}>
                            <FaLock />
                            <input type="password" placeholder="كلمة المرور" />
                        </div>
                        <input type="submit" className={styles.btn} value="إنشاء" />
                        <p className={styles['social-text']}>أو أنشئ حساب عبر الشبكات الاجتماعية</p>
                        <div className={styles['social-media']}>
                            <a href="#" className={styles['social-icon']}><FaFacebookF /></a>
                            <a href="#" className={styles['social-icon']}><FaTwitter /></a>
                            <a href="#" className={styles['social-icon']}><FaGoogle /></a>
                            <a href="#" className={styles['social-icon']}><FaLinkedinIn /></a>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles['panels-container']}>
                <div className={`${styles.panel} ${styles['left-panel']}`}>
                    <div className={styles.panelContent}>
                        <h3 className={styles.panelTitle}>جديد هنا؟</h3>
                        <p className={styles.panelText}>
                            نحن هنا لخدمتك في أي وقت. انضم إلينا للاستفادة من جميع خدماتنا المميزة.
                        </p>
                        <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignUp}>
                            إنشاء حساب
                        </button>
                    </div>
                    <Image src="../undraw_medical-research_pze7.svg" width={400} height={400} className={styles.image} alt="" />
                </div>
                <div className={`${styles.panel} ${styles['right-panel']}`}>
                    <div className={styles.panelContent}>
                        <h3 className={styles.panelTitle}>هل لديك حساب؟</h3>
                        <p className={styles.panelText}>
                            احصل على أدويتك واحتياجاتك الطبية بسرعة وأمان من أقرب صيدلية إلى باب منزلك.
                        </p>
                        <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignIn}>
                            تسجيل الدخول
                        </button>
                    </div>
                    <Image src="../undraw_medicine_hqqg.svg" width={400} height={400} className={styles.image} alt="" />
                </div>
            </div>
        </div>
    );
}