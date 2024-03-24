<?php

namespace Tests\Feature;

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testGetAdminEndpoint()
    {
        // Arrange
        $admin = factory(\App\Models\Admin::class)->create();

        // Act
        $response = $this->get('/api/admins/' . $admin->id);

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'username',
                'password',
                'email',
                'super_admin_id',
            ]);
    }

    /**
     * Test storing an API user.
     *
     * @return void
     */
    public function testStoreApiUser()
    {
        // Generate new data for creating the user
        $adminData = [
            'username' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => 'very secret',
        ];

        // Send a POST request to store the user
        $response = $this->post('/api/admins/add-admin', $adminData);

        // Assert that the request was successful (status code 201)
        $response->assertStatus(201);

        // Assert that the user was stored in the database with the provided data
        $this->assertDatabaseHas('admins', [
            'name' => $adminData['name'],
            'email' => $adminData['email'],
        ]);
    }

    /**
     * Test updating an API user.
     *
     * @return void
     */
    public function testUpdateApiUser()
    {
        // Create a user
        $admin = Admin::factory()->create();

        // Generate new data for updating the user
        $newData = [
            'username' => 'John 2 Doe',
            'email' => 'john2.doe@example.com',
            'password' => 'very2 secret',
        ];

        // Send a PUT request to update the user
        $response = $this->put('/api/admins/update-admin/' . $admin->id, $newData);

        // Assert that the request was successful (status code 200)
        $response->assertStatus(200);

        // Assert that the user was updated with the new data
        $this->assertDatabaseHas('users', [
            'id' => $admin->id,
            'username' => $newData['username'],
            'email' => $newData['email'],
        ]);
    }

    /**
     * Test deleting an API user.
     *
     * @return void
     */
    public function testDeleteApiUser()
    {
        // Create a user
        $admin = Admin::factory()->create();

        // Send a DELETE request to delete the user
        $response = $this->delete('/api/admins/delete-admin/' . $admin->id);

        // Assert that the request was successful (status code 204)
        $response->assertStatus(204);

        // Assert that the user no longer exists in the database
        $this->assertDatabaseMissing('users', [
            'id' => $admin->id,
        ]);
    }
}
