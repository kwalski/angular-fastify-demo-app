import { Component, OnInit } from '@angular/core';
import { ZooService, Animal } from '../zoo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
  animals: Animal[] = [];
  displayForm = false;
  formGroup: FormGroup;

  constructor(public zooService: ZooService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.zooService
      .getAnimals()
      .subscribe(reply => (this.animals = reply.animals));

    this.formGroup = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      count: ['', [Validators.required]]
    });
  }

  save() {
    if (!this.formGroup.valid) {
      console.log(this.formGroup);

      alert('form is not valid');
      return;
    } else {
      if (this.animals.findIndex(a => a.id === this.formGroup.value.id) > -1) {
        this.zooService.patchAnimal(this.formGroup.value).subscribe(reply => {
          this.animals = reply.animals;
          this.formGroup.reset();
          this.displayForm = false;
        });
      } else {
        this.zooService.postAnimal(this.formGroup.value).subscribe(reply => {
          this.animals = reply.animals;
          this.formGroup.reset();
          this.displayForm = false;
        });
      }
    }
  }

  edit(a: Animal) {
    this.formGroup.patchValue(a);
    this.displayForm = true;
  }

  delete(a: Animal) {
    this.zooService
      .deleteAnimal(a)
      .subscribe(reply => (this.animals = reply.animals));
  }
}
