import { NextRequest, NextResponse } from 'next/server';
import { getActiveMembers, teamMembers, type TeamMember } from '../../../data/teamData';

// GET /api/team - Get all team members
// POST /api/team - Add new team member
// PUT /api/team - Update team member
// DELETE /api/team - Delete team member

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    
    const members = activeOnly ? getActiveMembers() : teamMembers;
    
    return NextResponse.json({
      success: true,
      data: members,
      count: members.length
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, this would:
    // 1. Validate the request data
    // 2. Check user permissions
    // 3. Add to database
    // 4. Return the new member
    
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, role' },
        { status: 400 }
      );
    }
    
    // Simulate adding to database
    const newMember: TeamMember = {
      id: `member_${Date.now()}`,
      name: body.name,
      email: body.email,
      role: body.role,
      title: body.title || body.role,
      bio: body.bio || '',
      avatar: body.avatar,
      image: body.avatar || '/default-avatar.jpg',
      specializations: body.specializations || [],
      industries: body.industries || [],
      skills: body.skills || [],
      experience: body.experience || '',
      education: body.education || [],
      certifications: body.certifications || [],
      achievements: body.achievements || [],
      isActive: body.isActive !== false,
      joinDate: body.joinDate || new Date().toISOString(),
      isFoundingMember: body.isFoundingMember || false
    };
    
    return NextResponse.json({
      success: true,
      data: newMember,
      message: 'Team member added successfully'
    });
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add team member' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Member ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would update the database
    // For now, we'll just return the updated member data
    
    return NextResponse.json({
      success: true,
      data: body,
      message: 'Team member updated successfully'
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('id');
    
    if (!memberId) {
      return NextResponse.json(
        { success: false, error: 'Member ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would delete from database
    // For now, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: 'Team member removed successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
