const User = require('../modals/User'); // Example model
const Appointment = require('../modals/Appointment'); // Example model

const getDashboardData = async () => {
    const totalUsers = await User.countDocuments({});
    const activeUsers = await User.countDocuments({ isActive: true });
    const appointmentsToday = await Appointment.countDocuments({
        date: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) },
    });

    return { totalUsers, activeUsers, appointmentsToday };
};

module.exports = { getDashboardData };
