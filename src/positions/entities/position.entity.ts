import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  parentId: string | null;

  // Self-referencing Many-to-One: A position reports to one parent/manager
  @ManyToOne(() => Position, (position) => position.children, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: Position | null;

  // Self-referencing One-to-Many: A position can have multiple direct subordinates/children
  @OneToMany(() => Position, (position) => position.parent)
  children: Position[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
