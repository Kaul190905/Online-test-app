import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupBySubject } from '../data/assessments';
import ThemeToggle from '../components/ThemeToggle';
import Breadcrumb from '../components/Breadcrumb';
import AnimatedCounter from '../components/AnimatedCounter';
import PerformanceGraph from '../components/PerformanceGraph';
import CalendarView from '../components/CalendarView';
import ActivityFeed from '../components/ActivityFeed';
import FloatingActionButton from '../components/FloatingActionButton';
import MobileSidebar, { HamburgerButton } from '../components/MobileSidebar';
import { DashboardSkeleton } from '../components/Skeleton';
import { useToast } from '../components/Toast';
import useSound from '../hooks/useSound';
import { BookIcon, TargetIcon, CheckCircleIcon, ChartIcon } from '../components/Icons';

const Dashboard = ({ isDark, onThemeToggle, assessments, onStartTest, onLogout }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const { playClick, playSuccess } = useSound();

    // Loading state for skeleton
    const [isLoading, setIsLoading] = useState(true);

    // Mobile sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State for expanded subject groups
    const [expandedUpcoming, setExpandedUpcoming] = useState(null);
    const [expandedCompleted, setExpandedCompleted] = useState(null);

    // State for feedback modal
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleStartTest = (test) => {
        playSuccess();
        toast.info(`Starting ${test.title}...`);
        onStartTest(test);
        navigate('/rules');
    };

    const handleProfileClick = () => {
        playClick();
        navigate('/profile');
    };

    const toggleUpcoming = (subject) => {
        playClick();
        setExpandedUpcoming(prev => prev === subject ? null : subject);
    };

    const toggleCompleted = (subject) => {
        playClick();
        setExpandedCompleted(prev => prev === subject ? null : subject);
    };

    const handleViewFeedback = (test, e) => {
        e.stopPropagation();
        playClick();
        setSelectedTest(test);
        setShowFeedback(true);
    };

    const closeFeedback = () => {
        setShowFeedback(false);
        setSelectedTest(null);
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    // Generate recommendations based on score
    const getRecommendations = (test) => {
        const percentage = test.percentage;
        if (percentage >= 90) {
            return {
                grade: 'Excellent',
                gradeClass: 'excellent',
                message: 'Outstanding performance! You have demonstrated exceptional understanding of the subject.',
                tips: [
                    'Continue to challenge yourself with advanced topics',
                    'Consider helping peers who may be struggling',
                    'Explore additional resources to deepen your expertise'
                ]
            };
        } else if (percentage >= 70) {
            return {
                grade: 'Good',
                gradeClass: 'good',
                message: 'Great job! You have a solid understanding of the core concepts.',
                tips: [
                    'Review the questions you missed to identify knowledge gaps',
                    'Practice more problems to strengthen weak areas',
                    'Keep up the consistent effort'
                ]
            };
        } else if (percentage >= 50) {
            return {
                grade: 'Average',
                gradeClass: 'average',
                message: 'You passed, but there is room for improvement.',
                tips: [
                    'Revisit the fundamental concepts of this subject',
                    'Create a study schedule to cover weak topics',
                    'Seek help from instructors or study groups',
                    'Practice regularly with sample questions'
                ]
            };
        } else {
            return {
                grade: 'Needs Improvement',
                gradeClass: 'low',
                message: 'This score indicates areas that need significant attention.',
                tips: [
                    'Schedule a meeting with your instructor for guidance',
                    'Focus on understanding the basics before moving forward',
                    'Use video tutorials and additional learning resources',
                    'Consider forming a study group for collaborative learning',
                    'Practice consistently and track your progress'
                ]
            };
        }
    };

    // Group assessments by subject
    const groupedUpcoming = groupBySubject(assessments.upcoming);
    const groupedCompleted = groupBySubject(assessments.completed);

    // Calculate stats
    const totalTests = assessments.completed.length;
    const avgScore = totalTests > 0
        ? Math.round(assessments.completed.reduce((acc, test) => acc + test.percentage, 0) / totalTests)
        : 0;

    // Generate activities from completed tests
    const activities = assessments.completed.slice(0, 4).map((test, index) => ({
        type: index === 0 ? 'test_completed' : 'score_received',
        title: index === 0 ? `Completed ${test.title}` : 'Results Published',
        description: `Scored ${test.percentage}% on ${test.subject}`,
        timestamp: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toISOString()
    }));

    if (isLoading) {
        return (
            <div className="dashboard">
                <DashboardSkeleton />
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Mobile Sidebar */}
            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
            />

            {/* Breadcrumb Navigation */}
            <Breadcrumb />

            {/* Dashboard Header */}
            <header className="dashboard-header">
                <div className="header-left-section">
                    <HamburgerButton onClick={() => setSidebarOpen(true)} />
                    <h1>Student Dashboard</h1>
                </div>
                <div className="header-actions">
                    <div className="student-info clickable" onClick={handleProfileClick}>
                        <img src="https://via.placeholder.com/40" alt="Avatar" className="avatar" />
                        <span>John Doe</span>
                    </div>
                    <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
                </div>
            </header>

            {/* Enhanced Stats Grid */}
            <div className="enhanced-stats-grid">
                <div className="enhanced-stat-card">
                    <div className="stat-icon-wrapper primary"><BookIcon size={24} /></div>
                    <div className="stat-info">
                        <AnimatedCounter
                            end={assessments.upcoming.length}
                            className="stat-number"
                        />
                        <span className="stat-label">Upcoming Tests</span>
                    </div>
                </div>
                <div className="enhanced-stat-card">
                    <div className="stat-icon-wrapper success"><TargetIcon size={24} /></div>
                    <div className="stat-info">
                        <AnimatedCounter
                            end={assessments.live.length}
                            className="stat-number"
                        />
                        <span className="stat-label">Live Now</span>
                    </div>
                </div>
                <div className="enhanced-stat-card">
                    <div className="stat-icon-wrapper warning"><CheckCircleIcon size={24} /></div>
                    <div className="stat-info">
                        <AnimatedCounter
                            end={totalTests}
                            className="stat-number"
                        />
                        <span className="stat-label">Completed</span>
                    </div>
                </div>
            </div>

            {/* Live Assessments */}
            {assessments.live.length > 0 && (
                <section className="assessment-section">
                    <h2 className="section-title">
                        <span className="live-dot"></span>
                        Live Assessments
                    </h2>
                    <div className="assessment-grid">
                        {assessments.live.map((test) => (
                            <div key={test.id} className="assessment-card live-card">
                                <div className="card-header">
                                    <span className="subject-tag">{test.subject}</span>
                                    <span className="live-badge">LIVE</span>
                                </div>
                                <h3>{test.title}</h3>
                                <p className="instructor">By {test.instructor}</p>
                                <button
                                    className="btn-start"
                                    onClick={() => handleStartTest(test)}
                                >
                                    Start Test →
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Dashboard Widgets Grid */}
            <div className="dashboard-widgets">
                <div className="widget-column">
                    {/* Performance Graph */}
                    <PerformanceGraph data={assessments.completed} />

                    {/* Upcoming Assessments - Topic Boxes */}
                    <section className="assessment-section">
                        <h2 className="section-title">Upcoming Assessments</h2>
                        <div className="topic-boxes-grid">
                            {Object.entries(groupedUpcoming).map(([subject, tests]) => (
                                <div
                                    key={subject}
                                    className={`topic-box ${expandedUpcoming === subject ? 'active' : ''}`}
                                    onClick={() => toggleUpcoming(subject)}
                                >
                                    <span className="topic-name">{subject}</span>
                                    <span className="topic-count">{tests.length}</span>
                                </div>
                            ))}
                        </div>

                        {/* Expanded Content */}
                        {expandedUpcoming && groupedUpcoming[expandedUpcoming] && (
                            <div className="expanded-content">
                                <div className="expanded-header">
                                    <h3>{expandedUpcoming}</h3>
                                    <button className="btn-close" onClick={() => setExpandedUpcoming(null)}>✕</button>
                                </div>
                                <div className="assessment-grid">
                                    {groupedUpcoming[expandedUpcoming].map((test) => (
                                        <div key={test.id} className="assessment-card">
                                            <div className="card-header">
                                                <span className="subject-tag">{test.subject}</span>
                                                <span className="status-badge upcoming">Upcoming</span>
                                            </div>
                                            <h3>{test.title}</h3>
                                            <p className="instructor">By {test.instructor}</p>
                                            <p className="scheduled-date">Scheduled: {test.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Completed Assessments - Topic Boxes */}
                    <section className="assessment-section">
                        <h2 className="section-title">Completed Assessments</h2>
                        <div className="topic-boxes-grid">
                            {Object.entries(groupedCompleted).map(([subject, tests]) => (
                                <div
                                    key={subject}
                                    className={`topic-box completed ${expandedCompleted === subject ? 'active' : ''}`}
                                    onClick={() => toggleCompleted(subject)}
                                >
                                    <span className="topic-name">{subject}</span>
                                    <span className="topic-count">{tests.length}</span>
                                </div>
                            ))}
                        </div>

                        {/* Expanded Content */}
                        {expandedCompleted && groupedCompleted[expandedCompleted] && (
                            <div className="expanded-content">
                                <div className="expanded-header">
                                    <h3>{expandedCompleted}</h3>
                                    <button className="btn-close" onClick={() => setExpandedCompleted(null)}>✕</button>
                                </div>
                                <div className="completed-list">
                                    {groupedCompleted[expandedCompleted].map((test) => (
                                        <div key={test.id} className="completed-card">
                                            <div className="completed-info">
                                                <div className="completed-header">
                                                    <h4>{test.title}</h4>
                                                    <span className="status-badge completed">Completed</span>
                                                </div>
                                                <p className="completed-meta">
                                                    {test.instructor} • {test.date}
                                                </p>
                                            </div>
                                            <div className="completed-actions">
                                                <button
                                                    className="btn-view-summary"
                                                    onClick={(e) => handleViewFeedback(test, e)}
                                                >
                                                    View Summary
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column - Calendar and Activity */}
                <div className="widget-column">
                    <CalendarView events={assessments.upcoming} />
                    <ActivityFeed activities={activities} />
                </div>
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton />

            {/* Summary Modal - Assessment Wrap-up */}
            {showFeedback && selectedTest && (
                <div className="summary-modal" onClick={closeFeedback}>
                    <div className="summary-card" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-close-modal" onClick={closeFeedback}>✕</button>

                        {/* Illustration Area */}
                        <div className="summary-illustration">
                            <div className={`illustration-icon ${getRecommendations(selectedTest).gradeClass}`}>
                                {getRecommendations(selectedTest).gradeClass === 'excellent' && '🎯'}
                                {getRecommendations(selectedTest).gradeClass === 'good' && '✨'}
                                {getRecommendations(selectedTest).gradeClass === 'average' && '📈'}
                                {getRecommendations(selectedTest).gradeClass === 'low' && '💪'}
                            </div>
                        </div>

                        {/* Key Heading */}
                        <div className="summary-header">
                            <h2>Assessment Complete</h2>
                            <p className="summary-title">{selectedTest.title}</p>
                            <span className={`summary-grade ${getRecommendations(selectedTest).gradeClass}`}>
                                {getRecommendations(selectedTest).grade}
                            </span>
                        </div>

                        {/* One-line Feedback */}
                        <div className="summary-feedback">
                            <p>{getRecommendations(selectedTest).message}</p>
                        </div>

                        {/* Recommendations */}
                        <div className="summary-recommendations">
                            <h4>What's Next?</h4>
                            <ul>
                                {getRecommendations(selectedTest).tips.slice(0, 3).map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Close Button */}
                        <button className="btn-close-summary" onClick={closeFeedback}>
                            Close Summary
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
