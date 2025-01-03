'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchUserProfile } from '@/lib/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ProfilePageContent = () => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  })

  if (isLoading) return <ProfileSkeleton />
  if (error || !user) return <div className="text-neutral-500">Unable to load profile</div>

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarImage src={user.profileImage} alt={user.username} />
            <AvatarFallback className="bg-neutral-200">{user.firstName?.[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-light mb-2">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-neutral-600">{user.email}</p>
          <p className="text-sm text-neutral-500 mt-1">{user.department}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Section title="Personal Details" key="personal-details">
            <div className="grid grid-cols-2 gap-6">
              <InfoItem label="Blood Group" value={user.bloodGroup} key="blood-group" />
              <InfoItem label="Age" value={user.age} key="age" />
              <InfoItem label="Date of Birth" value={new Date(user.dateOfBirth).toLocaleDateString()} key="dob" />
              <InfoItem label="Phone" value={user.phoneNumber} key="phone" />
            </div>
          </Section>

          <Section title="Address & Documents" key="address-docs">
            <div className="space-y-4">
              <InfoItem label="Address" value={user.permanentAddress} key="address" />
              <div className="grid grid-cols-2 gap-6">
                <InfoItem label="Aadhar" value={user.aadharNumber} key="aadhar" />
                <InfoItem label="Vehicle" value={user.vehicleNumber} key="vehicle" />
              </div>
            </div>
          </Section>

          <Section title="Quarter Information" key="quarter-info">
            <div className="grid grid-cols-2 gap-6">
              <InfoItem label="Quarter Number" value={user.quarterNumber} key="quarter-number" />
              <InfoItem label="Quarter Name" value={user.quarterName} key="quarter-name" />
            </div>
          </Section>

          <Section title="Family Members" key="family-members">
            <div className="grid gap-4">
              {user.inmates.map((inmate) => (
                <div key={inmate.inmateId} className="flex items-center space-x-4 p-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm text-neutral-600">
                    {inmate.name[0]}
                  </div>
                  <div>
                    <p className="text-neutral-800">{inmate.name}</p>
                    <p className="text-sm text-neutral-500">{inmate.relation} • {inmate.age} years</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-6">
      <h2 className="text-lg font-light text-neutral-800 mb-4">{title}</h2>
      {children}
    </CardContent>
  </Card>
)

interface InfoItemProps {
  label: string
  value: string | number | undefined
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div>
    <p className="text-sm text-neutral-500 mb-1">{label}</p>
    <p className="text-neutral-800">{value || 'Not provided'}</p>
  </div>
)

const ProfileSkeleton = () => (
  <div className="max-w-3xl mx-auto p-6 space-y-6">
    <div className="text-center">
      <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-48 mx-auto mb-2" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
    {Array.from({ length: 4 }).map((_, i) => (
      <Card key={`skeleton-${i}`} className="border-0">
        <CardContent className="p-6">
          <Skeleton className="h-[120px] w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
)

export default ProfilePageContent