import Sequelize, { Model } from 'sequelize';
import SequelizePaginate from 'sequelize-paginate';

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

SequelizePaginate.paginate(HelpOrders);

export default HelpOrders;
