import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar" })
	originLat!: string;

	@Column({ type: "varchar" })
	originLng!: string;

	@Column({ type: "varchar" })
	destLat!: string;

	@Column({ type: "varchar" })
	destLng!: string;

	@Column({ type: "int" })
	distance!: number;

	@Column({
		type: "enum",
		enum: ["UNASSIGNED", "TAKEN"],
		default: "UNASSIGNED",
	})
	status!: string;
}
