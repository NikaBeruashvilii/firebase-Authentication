import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseWorkerService } from '../../services/firebase-worker.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  uid!: string;
  userName!: string;
  phoneNumber!: string;
  email!: string;
  cardNumber!:number;
  cardCvv!:number;
  expirationDate!:string;

  inpType: string = 'password';
  user: User = new User();


  constructor(private router:Router, private fireWorker:FirebaseWorkerService,
    private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.fireWorker.user$.subscribe((user: any) => {
      this.uid = user.id;
      this.userName = user.userName;
      this.phoneNumber = user.phoneNumber;
      this.email = user.email;
      this.cardNumber = user.cardNumber;
      this.cardCvv = user.cardCvv;
      this.expirationDate = user.expirationDate;
      console.log(user);      
    })
  }

  onFormSubmit() {
    this.afs.collection('users').doc(this.uid).set({
      'userName': this.userName,
      'phoneNumber': this.phoneNumber,
      'email': this.email,
      'cardNumber': this.cardNumber,
      'cardCvv': this.cardCvv,
      'expirationDate': this.expirationDate
    }, { merge: true })
      .then(() => {
        this.router.navigate(['/profile'])
      })
  }

}
