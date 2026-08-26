'use client';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  UserCredential,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(authInstance, email, password);
}

/**
 * Initiates email/password sign-in.
 */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(authInstance, email, password);
}

/**
 * Initiates Google 1-Click Popup sign-in/sign-up.
 */
export function initiateGoogleSignIn(authInstance: Auth): Promise<UserCredential> {
  return signInWithPopup(authInstance, googleProvider);
}

/**
 * Sends a password reset email.
 */
export function initiatePasswordReset(authInstance: Auth, email: string): Promise<void> {
  return sendPasswordResetEmail(authInstance, email);
}

