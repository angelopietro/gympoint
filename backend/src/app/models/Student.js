import Sequelize, { Model } from 'sequelize';
import SequelizePaginate from 'sequelize-paginate';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        height: Sequelize.STRING,
        weight: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

SequelizePaginate.paginate(Student);

export default Student;
