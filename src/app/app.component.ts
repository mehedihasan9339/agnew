import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { SheetDescriptor, SheetRow, SpreadsheetComponent, SpreadsheetMainMenuItem } from '@progress/kendo-angular-spreadsheet';
import { sheets } from './sheets';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    @ViewChild(SpreadsheetComponent) spreadsheet!: SpreadsheetComponent;

    public showDialog = false;
    index: number = 10;
    public newRow = {
      id: '',
      product: '',
      quantity: 0,
      price: 0,
      tax: 0,
      amount: 0
    };

    public sheets: SheetDescriptor[] = [];
    public items: SpreadsheetMainMenuItem[] = [
        { id: 'file', active: true },
        { id: 'home' },
        { id: 'insert' }
    ];

    constructor(private zone: NgZone, private cd: ChangeDetectorRef){
      this.sheets = sheets;
    }


    onSubmit(): void {
      this.addRow('Food Order', this.newRow);

      this.newRow = { id: '', product: '', quantity: 0, price: 0, tax: 0, amount: 0 };
      this.closeDialog();
    }




    addRow(sheetName: string, newRow: any) {
      const sheet = this.sheets.find(s => s.name === sheetName);
      this.index++;

      const rows = sheet?.rows ?? [];
      const newSheetRow: SheetRow = {
        cells: [
          { value: newRow.id, textAlign: 'center', background: 'rgb(255,255,255)', color: 'rgb(0,62,117)' },
          { value: newRow.product, background: 'rgb(255,255,255)', color: 'rgb(0,62,117)' },
          { value: newRow.quantity, textAlign: 'center', background: 'rgb(255,255,255)', color: 'rgb(0,62,117)' },
          { value: newRow.price, format: '$#,##0.00', background: 'rgb(255,255,255)', color: 'rgb(0,62,117)' },
          { value: newRow.tax, format: '$#,##0.00', background: 'rgb(255,255,255)', color: 'rgb(0,62,117)' },
          { value: newRow.amount, format: '$#,##0.00', background: 'rgb(255,255,255)', color: 'rgb(0,62,117)' },
          { background: 'rgb(255,255,255)', color: 'rgb(0,62,117)' }
        ],
      };

      rows.splice(this.index, 0, newSheetRow);


      this.zone.run(() => {
        this.sheets = this.sheets.map(sh => {
          if (sh.name === sheetName) {
            return { ...sh, rows: [...rows] as SheetRow[] };
          }
          return ({...sh});
        }) as SheetDescriptor[];

        this.cd.detectChanges();


        console.log('Rows after addition:', this.sheets.find(s => s.name === sheetName)?.rows);
      });

      console.log(this.sheets);
    }


    closeDialog(): void {
      this.showDialog = false;
    }

    public addRowClick(): void {
      this.showDialog = true;
      // let rows = this.sheets[0].rows ?? [];

      // let index = rows?.findIndex(r => r.index != null) ?? 1;
      // let existingRow = rows[index - 1];
      // let newCells = existingRow.cells?.map(cell => ({
      //   ...cell
      // }));

      // let newRow = {...existingRow, cells: newCells };
      // if (newRow.cells && newRow.cells.length > 0)
      //   newRow.cells[0].value = 123;

      // rows.splice(index, 0, newRow);

      // this.zone.run(() => {
      //   this.sheets = this.sheets.map(sh => {
      //     if (sh.rows != null) {
      //       return ({...sh, rows: [...rows] as SheetRow[]})
      //     }
      //     else
      //       return ({...sh})
      //   }) as SheetDescriptor[];

      //   console.log(this.sheets[0].rows?.length);
      // });
    }
}
