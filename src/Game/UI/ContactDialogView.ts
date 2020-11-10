import {Label, ScreenElement} from "excalibur";
import {ContactConfig} from "../../config";

export class ContactDialogView extends ScreenElement
{
    private readonly nameLabel: Label;
    private readonly emailLabel: Label;

   constructor(config: ContactConfig, x: number, y: number) {
       super({
           x, y, visible: false
       });
       this.nameLabel = new Label(config.name, x, y, 'Arial')
       this.emailLabel = new Label(config.email, x, y - 30, 'Arial')

       this.add(this.nameLabel);
       this.add(this.emailLabel);
   }

   public hide(): void
   {
       this.nameLabel.visible = false;
       this.emailLabel.visible = false;
   }

    public show(): void
    {
        this.nameLabel.visible = true;
        this.emailLabel.visible = true;
    }
}
