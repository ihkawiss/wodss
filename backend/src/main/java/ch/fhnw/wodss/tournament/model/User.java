package ch.fhnw.wodss.tournament.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import ch.fhnw.wodss.tournament.model.permission.Permission;

/**
 * Representation of a application's user.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */

@Entity
public class User {

	@Id
	@GeneratedValue
	private Long id;

	private String username;

	private String password;

	private String mail;

	private boolean verified;

	private boolean active;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Permission> permissions;

	public User(String username, String password, String mail) {
		this.permissions = new ArrayList<>();

		this.username = username;
		this.password = password;
		this.mail = mail;

		// new users are inactive until mail verification
		this.verified = false;
		this.active = false;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public void addPermission(Permission p) {
		permissions.add(p);
	}

}
